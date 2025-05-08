import { OrderSide } from '@api/orders/OrderTypes';
import { TickerCategory } from '@api/tickers/TickersTypes';
import { TransactionSide } from '@api/transactions/TransactionsTypes';
import {
  TransactionFields,
} from '@components/pages/operations/transactions/form/fields/TransactionsFormFields';

export type Translations = {
  title: 'Banky',
  form: {
    validation: {
      invalid_date: string,
      positive_amount: string,
      required_field: string,
    },
  },
  common: {
    treasury: string,
    incomes: string,
    expenses: string,
    savings: string,
    accounts: string,
  },
  // actions
  action: {
    edit: string,
    back: string,
    cancel: string,
    save: string,
    delete: string,
    search: string,
    add: string,
    authenticate: string,
    disconnect: string,
    keep_editing: string,
    close_without_saving: string,
  },
  // common labels
  label: {
    creation_date: string,
    loading: string,
  },
  // common messages
  message: {
    changes_saved: string,
    unsaved_data: string,
    confirm_delete: string,
    side: Record<TransactionSide, string>,
    tickerCategory: Record<TickerCategory, string>,
    orderSide: Record<OrderSide, string>,
  },
  // errors
  error: {
    unknownChoice: string,
    field: {
      required: string,
      email_wrong_format: string,
    },
  },
  'http-errors': {
    INTERNAL_ERROR: string,
    NETWORK_ERROR: string,
    TIMEOUT_ERROR: string,
    FORBIDDEN_ERROR: string,
    WRONG_LOGIN_OR_PASSWORD: string,
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => string,
    FIELD_REQUIRED: (fieldName: string) => string,
    MESSAGE: (message: string) => string,
  },
  pagination: {
    pageInfo: (currentPage: number, totalPage: number) => string,
  },
  sidebar: {
    dashboard: {
      title: string,
    },
    parameters: {
      title: string,
      tickers: string,
      accounts: string,
      categories: string,
      subCategories: string,
    },
    operations: {
      title: string,
      transactions: string,
      orders: string,
      transfert: string,
    },
    evolution: {
      treasury: string,
      graph: string,
      monthlyBudget: string,
    },
  },
  parameters: {
    accounts: {
      title: string,
      subTitle: string,
    },
    categories: {
      title: string,
      subTitle: string,
      table: {
        name: string,
        numberOfSubCategories: string,
        action: string,
      },
    },
    subCategories: {
      title: string,
      subTitle: string,
      table: {
        name: string,
        categoryName: string,
        action: string,
      },
    },
    tickers: {
      title: string,
      subTitle: string,
      table: {
        name: string,
        shortName: string,
        category: string,
        action: string,
      },
    }
  },
  evolution: {
    monthlyBudget: {
      title: string,
      subTitle: string,
      viewTypes: {
        REAL: string,
        THEORETICAL: string,
      },
      table: {
        category: string,
        stockFees: string,
        totalSavings: string,
        spent: string,
        budgeted: string,
        spentPercentage: string,
        totalPercentage: string,
        total: string,
        totalWithoutSavings: string,
        balance: string,
        balanceWithoutSavings: string,
      },
    },
  },
  operations: {
    transactions: {
      title: string,
      subTitle: string,
      table: {
        date: string,
        amount: string,
        accountName: string,
        subCategoryName: string,
        comment: string,
        tag: string,
        fromToPersonName: string,
        action: string,
      },
      form: {
        title: string,
        description: string,
        fields: Record<TransactionFields, string> & {
          from: string,
          to: string,
        },
      },
    },
    transferts: {
      title: string,
      subTitle: string,
      table: {
        date: string,
        amount: string,
        fromAccountName: string,
        toAccountName: string,
        action: string,
      },
      form: {
        title: string,
        description: string,
        fromAccount: string,
        toAccount: string,
        amount: string,
        date: string,
        selectAccount: string,
        pickDate: string,
      },
    },
    orders: {
      title: string,
      subTitle: string,
      table: {
        date: string,
        name: string,
        side: string,
        quantity: string,
        amount: string,
        charges: string,
        accountName: string,
        tickerCategory: string,
        tickerName: string,
        buy: string,
        sell: string,
        noOrders: string,
      },
      buy: string,
      sell: string,
      noOrders: string,
    },
  },
  dashboard: {
    cards: {
      fromLastMonth: string,
    },
    charts: {
      title: string,
    }
  }
};
