module.exports = {
    "plugins": [
        "lit",
        "lit-a11y",
      ],
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
        "wc": {
          "elementBaseClasses": ["LitElement"]
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:lit/recommended",
        "plugin:wc/recommended",
        "plugin:lit-a11y/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
        "lit-a11y/alt-text": "error",
        "lit-a11y/aria-role": "error",
        "space-before-function-paren": ["error", "always"],
        "no-multi-spaces" : "error",
        "no-irregular-whitespace" : "error",
        "no-console" : "error",
        "no-debugger" : "error",
        "no-alert" : "error",
        "eol-last" : "error",
        "lit/attribute-value-entities" : "error",
        "lit/binding-positions" : "error",
        "lit/no-duplicate-template-bindings" : "error",
        "lit/no-invalid-escape-sequences" : "error",
        "lit/no-invalid-html" : "error",
        "lit/no-legacy-template-syntax" : "error",
        "lit/no-legacy-imports" : "error",
        "lit/no-private-properties" : "error",
        "lit/no-property-change-update" : "error",
        "lit/no-template-arrow" : "error",
        "lit/no-template-bind" : "error",
        "lit/no-template-map" : "error",
        "lit/no-useless-template-literals" : "error",
        "lit/no-value-attribute" : "error",
        "lit/quoted-expressions" : "error",
        "wc/no-constructor-attributes" : "error",
        "wc/no-invalid-element-name" : "error",
        "wc/no-self-class" : "error",
        "wc/attach-shadow-constructor" : "error",
        "wc/guard-super-call" : "error",
        "wc/no-closed-shadow-root" : "error",
        "wc/no-constructor-params" : "warn",
        "wc/no-typos" : "error",
        "wc/require-listener-teardown" : "error",
    }
};
