import * as React from 'react'
import { injectIntl } from 'react-intl'
import { PaymentModel } from 'gocommerce.admin-gateway'

interface PaymentFormProps {
  intl: any
}

interface PaymentFormState {}

class PaymentFormComponent extends React.PureComponent<PaymentFormProps, PaymentFormState> {
  render() {
    const { intl } = this.props
    const intlPrefix = 'admin.payment.mercadopago'
    const optionsYesNo = [
      {
        "value": false,
        "label": "No"
      },
      {
        "value": true,
        "label": "Yes"
      }
    ]
    const optionsInstallments = new Array(12).fill(0).map(function(_, i) {
      const curr = i + 1
      return {
        "value": curr,
        "label": `${curr}x`
      }
    })
    const paymentSchema = {
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
            "creditCardActive": {
              "type": "boolean",
              "widget": "toggle",
              "options": optionsYesNo,
              "title": intl.formatMessage({ id: `${intlPrefix}.creditCardActive` })
            },
            "redirectActive": {
              "type": "boolean",
              "widget": "toggle",
              "options": optionsYesNo,
              "title": intl.formatMessage({ id: `${intlPrefix}.redirectActive` })
            },

            "minimumValue": {
              "type": "number",
              "widget": "currency",
              "title": intl.formatMessage({ id: `${intlPrefix}.minimumValue` }),
              "description": intl.formatMessage({ id: `${intlPrefix}.minimumValue.description` })
            }
          }
        },
        "boxApplicationSetup": {
          "title": intl.formatMessage({ id: `${intlPrefix}.boxApplicationSetup` }),
          "button": "Instalar aplicativo",
          "id": "applicationSetup",
          "showFieldsOnlyAuthorized": true,
          "fields": {}
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
                  "type": "boolean",
                  "widget": "select",
                  "title": intl.formatMessage({ id: `${intlPrefix}.installments.numberOfInstallments` }),
                  "options": optionsInstallments,
                  "validate": {
                    "required": true
                  }
                },
                "numberOfInstallmentsInterestFree": {
                  "type": "boolean",
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
        "bankInvoiceActive": "false"
      }
    }

    return <PaymentModel payment_id="mercadopagov1" paymentSchema={paymentSchema} />
  }
}

export default injectIntl(PaymentFormComponent)
