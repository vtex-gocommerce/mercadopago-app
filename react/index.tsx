import * as React from 'react'
import { injectIntl } from 'react-intl'
import { Context } from 'gocommerce.gc-utils'
import { PaymentModel } from 'gocommerce.admin-gateway'

interface PaymentFormProps {
  intl: any
}

interface PaymentFormState {}

interface AccountDataInterface {
  accountData: {
    country: string
  }
}

class PaymentFormComponent extends React.PureComponent<PaymentFormProps, PaymentFormState> {
  render() {
    return (
      <Context.AccountContext.Consumer>
        {({ accountData }:AccountDataInterface) => {
          const { country } = accountData
          const { intl } = this.props
          const intlPrefix = 'admin.payment.mercadopago'
          const optionsInstallments = new Array(12).fill(0).map(function(_, i) {
            const curr = i + 1
            return {
              "value": curr,
              "label": `${curr}x`
            }
          })
          const optionsMaxInstallments = [
            {
              "value": 1,
              "label": '1x'
            },
            {
              "value": 3,
              "label": '3x'
            },
            {
              "value": 6,
              "label": '6x'
            },
            ...((country === 'BRA' || country === 'ARG' || country === 'MEX' || country === 'COL') ? [
              {
                "value": 12,
                "label": '12x'
              },
            ] : []),
            ...((country === 'COL') ? [
              {
                "value": 18,
                "label": '18x'
              },
              {
                "value": 24,
                "label": '24x'
              },
              {
                "value": 36,
                "label": '36x'
              },
            ] : []),
          ]
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
                    "title": intl.formatMessage({ id: `${intlPrefix}.creditCardActive` })
                  },
                  ...((country === 'PER' || country === 'ARG') && {
                    "debitCardActive": {
                      "type": "boolean",
                      "widget": "toggle",
                      "title": intl.formatMessage({ id: `${intlPrefix}.debitCardActive` })
                    }
                  }),
                  ...(country === 'BRA' && {
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
                    "options": optionsMaxInstallments,
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
          }
          return <PaymentModel payment_id="mercadopagov1" paymentSchema={paymentSchema} />
        }}
      </Context.AccountContext.Consumer>
    )
  }
}

export default injectIntl(PaymentFormComponent)
