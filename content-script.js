(() => {
  'use strict';

  const METHOD_INPUT_SELECTOR = 'input#SD1_MethodName';
  const OBSERVER_OPTIONS = {
    childList: true,
    subtree: true,
    characterData: true
  };

  let lastMethodName = null;

  function extractMethodName() {
    const input = document.querySelector(METHOD_INPUT_SELECTOR);
    if (!input || !input.value) return null;
    return input.value.trim();
  }

  function updateTitle() {
    const methodName = extractMethodName();
    if (!methodName) return;
    if (methodName === lastMethodName) {
      return;
    }

    lastMethodName = methodName;
    document.title = `AD: ${methodName}`;
  }

  function setupObserver() {
    const observer = new MutationObserver(() => {
      const methodName = extractMethodName();
      if (methodName && methodName !== lastMethodName) {
        updateTitle();
      }
    });

    observer.observe(document.body, OBSERVER_OPTIONS);
  }

  function init() {
    if (document.querySelector(METHOD_INPUT_SELECTOR)) {
      updateTitle();
    } else {
    }
    setupObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
