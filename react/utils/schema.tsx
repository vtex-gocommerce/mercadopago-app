import { Injectedintl } from 'react-intl'

const intlPrefix = 'admin.payment.mercadopago'

const optionsInstallments = new Array(12).fill(0).map(function(_, i) {
  const curr = i + 1
  return {
    value: curr,
    label: `${curr}x`
  }
})

const optionsMaxInstallments = (country: string) => [
  { value: 1, label: '1x' },
  { value: 3, label: '3x' },
  { value: 6, label: '6x' },
  { value: 12, label: '12x' },
  ...((country === 'COL') ? [
    { value: 18, label: '18x' },
    { value: 24, label: '24x' },
    { value: 36, label: '36x' },
  ] : []),
]

export default (country: string, intl: Injectedintl) => ({
  "title": "Mercado Pago",
  "properties": {
    "boxGeneral": {
      "title": intl.formatMessage({ id: `${intlPrefix}.boxGeneral` }),
      "id": "general",
      "fields": {
        "rule.isDefault": {
          "type": "boolean",
          "widget": "hidden",
          "title": "isDefault"
        },
        "paymentAlias": {
          "type": "string",
          "widget": "hidden",
          "title": "paymentAlias"
        },
        "interestRate": {
          "type": "string",
          "widget": "hidden",
          "title": "interestRate"
        },
        ...((country === 'BRA' || country === 'COL' || country === 'ARG' || country === 'MEX' || country === 'CHL') && {
          "creditCardActive": {
            "type": "boolean",
            "widget": "toggle",
            "title": intl.formatMessage({ id: `${intlPrefix}.creditCardActive` })
          }
        }),
        ...((country === 'MEX' || country === 'ARG') && {
          "debitCardActive": {
            "type": "boolean",
            "widget": "toggle",
            "title": intl.formatMessage({ id: `${intlPrefix}.debitCardActive` })
          }
        }),
        ...((country === 'BRA' || country === 'COL' || country === 'ARG' || country === 'MEX' || country === 'CHL') && {
          "bankInvoiceActive": {
            "type": "boolean",
            "widget": "toggle",
            "title": intl.formatMessage({ id: `${intlPrefix}.bankInvoiceActive` })
          }
        }),
        "redirectActive": {
          "type": "boolean",
          "widget": "toggle",
          "title": intl.formatMessage({ id: `${intlPrefix}.redirectActive` })
        },
        ...((country === 'COL') && {
          "transferActive": {
            "type": "boolean",
            "widget": "toggle",
            "title": intl.formatMessage({ id: `${intlPrefix}.transferActive` })
          }
        }),
      }
    },
    "boxApplicationSetup": {
      "title": intl.formatMessage({ id: `${intlPrefix}.boxApplicationSetup` }),
      "button": "Instalar aplicativo",
      "id": "applicationSetup",
      "showFieldsOnlyAuthorized": true,
      "fields": {}
    },
    "boxAdditionalSetup": {
      "title": intl.formatMessage({ id: `${intlPrefix}.boxAdditionalSetup` }),
      "id": "additionalSetup",
      "fields": {
        "affiliation.configuration.SoftDescriptor": {
          "type": "string",
          "widget": "text",
          "title": intl.formatMessage({ id: `${intlPrefix}.softDescriptor` }),
          "description": intl.formatMessage({ id: `${intlPrefix}.softDescriptor.description` }),
          "validate": {
            "maxLength": 13
          }
        },
        "affiliation.configuration.maxInstallments": {
          "type": "number",
          "widget": "select",
          "title": intl.formatMessage({ id: `${intlPrefix}.maxInstallments` }),
          "options": optionsMaxInstallments(country),
          "validate": {
            "required": true
          }
        }
      }
    },
    "boxInstallments": {
      "title": intl.formatMessage({ id: `${intlPrefix}.boxInstallments` }),
      "id": "installments",
      "fields": {
        "minimumInstallmentValue": {
          "type": "number",
          "widget": "currency",
          "title": intl.formatMessage({ id: `${intlPrefix}.minimumInstallmentValue` })
        },
        "installments": {
          "fields": {
            "numberOfInstallments": {
              "type": "number",
              "widget": "select",
              "title": intl.formatMessage({ id: `${intlPrefix}.installments.numberOfInstallments` }),
              "options": optionsInstallments,
              "validate": {
                "required": true
              }
            },
            "numberOfInstallmentsInterestFree": {
              "type": "number",
              "widget": "select",
              "title": intl.formatMessage({ id: `${intlPrefix}.installments.numberOfInstallmentsInterestFree` }),
              "options": optionsInstallments,
              "validate": {
                "required": true
              },
              "description": intl.formatMessage({ id: `${intlPrefix}.installments.numberOfInstallmentsInterestFree.description` })
            }
          }
        }
      }
    }
  },
  "additionalData": {
    "requireAuthorize": true,
    "description": intl.formatMessage({ id: `${intlPrefix}.additionalData.description` })
  },
  "initialValues": {
    "paymentAlias": "mercadopagov1",
    "creditCardActive": false,
    "redirectActive": false,
    "numberOfInstallments": 12,
    "numberOfInstallmentsInterestFree": 1,
    "affiliation.configuration.maxInstallments": 12
  }
})