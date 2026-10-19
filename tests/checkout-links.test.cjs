const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function checkout({ search = '', stored = {}, blocked = false } = {}) {
  const cache = new Map();
  const window = { location: { search, origin: 'http://localhost:5173' } };
  const storage = new Map([['npp-campaign', JSON.stringify(stored)]]);
  const sessionStorage = {
    getItem: key => { if (blocked) throw new Error('Storage blocked'); return storage.get(key); },
    setItem: (key, value) => { if (blocked) throw new Error('Storage blocked'); storage.set(key, value); },
  };
  function load(file) {
    const filename = path.resolve(file);
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    vm.runInNewContext(code, {
      module, exports: module.exports, window, sessionStorage, URL, URLSearchParams,
      require: specifier => {
        if (specifier === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }) };
        const source = path.resolve(path.dirname(filename), specifier);
        return load(source + (fs.existsSync(source + '.ts') ? '.ts' : '.tsx'));
      },
    });
    return module.exports;
  }
  return { ...load('src/RegistrationLink.tsx'), ...load('src/event-config.ts'), ...load('src/analytics.ts'), window };
}

test('every kit navigates to the official selection page and tracks the selected kit', () => {
  const app = checkout();
  for (const kit of app.eventConfig.kits) {
    const link = app.RegistrationLink({ kit, children: `Quero o ${kit.name}` });
    assert.equal(link.type, 'a');
    assert.equal(link.props.href, app.eventConfig.checkoutUrl);
    link.props.onClick();
    assert.equal(app.window.dataLayer.at(-2).event, 'select_kit');
    assert.equal(app.window.dataLayer.at(-1).event, 'begin_checkout');
    assert.equal(app.window.dataLayer.at(-1).kit, kit.id);
    assert.equal(app.window.dataLayer.at(-1).value, kit.price);
  }
  assert.equal(app.window.dataLayer.some(event => event.event === 'purchase'), false);
});

test('generic registration links also navigate directly to Ticketmaker', () => {
  const app = checkout();
  const link = app.RegistrationLink({ children: 'Inscreva-se' });
  assert.equal(link.props.href, app.eventConfig.checkoutUrl);
  link.props.onClick();
  assert.equal(app.window.dataLayer.at(-1).event, 'begin_checkout');
});

test('campaign is included before page_view, new UTMs win and unrelated data stays local', () => {
  const app = checkout({
    search: '?utm_source=instagram&utm_campaign=lancamento&unrelated=local',
    stored: { utm_source: 'old', utm_medium: 'social', unrelated: 'local' },
  });
  const href = new URL(app.RegistrationLink({ children: 'Inscreva-se' }).props.href);
  assert.equal(href.searchParams.get('utm_source'), 'instagram');
  assert.equal(href.searchParams.get('utm_campaign'), 'lancamento');
  assert.equal(href.searchParams.get('utm_medium'), 'social');
  assert.equal(href.searchParams.has('unrelated'), false);
  app.track('page_view');
  assert.equal(app.window.dataLayer.at(-1).utm_source, 'instagram');
});

test('blocked storage does not prevent registration or lose URL campaign parameters', () => {
  const app = checkout({ search: '?utm_source=instagram', blocked: true });
  const link = app.RegistrationLink({ kit: app.eventConfig.kits[0] });
  assert.equal(new URL(link.props.href).searchParams.get('utm_source'), 'instagram');
  assert.doesNotThrow(() => link.props.onClick());
});

test('paused sales do not send people into checkout', () => {
  const app = checkout();
  app.eventConfig.registrationStatus = 'SALES_PAUSED';
  const link = app.RegistrationLink({ kit: app.eventConfig.kits[0] });
  assert.equal(link.props.href, '#kits');
  link.props.onClick();
  assert.equal(app.window.dataLayer, undefined);
});
