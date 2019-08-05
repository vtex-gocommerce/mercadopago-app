import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'

import { Context } from 'gocommerce.gc-context'
import { PaymentModel } from 'gocommerce.admin-gateway'

import fingerprint from './utils/fingerprint'
import schema from './utils/schema'

interface PaymentFormProps {
  intl: InjectedIntl
}

interface AccountDataInterface {
  accountData: {
    country: string
  }
}

const PaymentFormComponent = ({ intl }: PaymentFormProps) => (
  <Context.AccountContext.Consumer>
    {({ accountData: { country } }: AccountDataInterface) => {
      const paymentSchema = schema(country, intl)

      return (
        <PaymentModel
          payment_id="mercadopagov1"
          paymentSchema={paymentSchema}
          paymentFingerprint={fingerprint}
        />
      )
    }}
  </Context.AccountContext.Consumer>
)

export default injectIntl(PaymentFormComponent)
