import { OrderFields } from '@components/pages/operations/orders/form/fields/OrdersFormFields';
import { TickerCategory } from '@api/tickers/TickersTypes';
import {
  TransactionFields,
} from '@components/pages/operations/transactions/form/fields/TransactionsFormFields';
import {
  TransfertFields,
} from '@components/pages/operations/transferts/form/fields/TransfertsFormFields';
import { Routes } from '@components/Routes';
import { TransactionSide } from '@/api/transactions/TransactionsTypes';
import { OrderSide } from '@/api/orders/OrderTypes';
import { Translations } from './Translations';

const frMessages: Translations = {
  title: 'Banky',
  routeInfo: {
    [Routes.ROUTE_DASHBOARD]: {
      title: 'Tableau de bord',
      description: 'Vue d\'ensemble de vos finances',
    },
    [Routes.ROUTE_OPERATIONS_TRANSACTIONS]: {
      title: 'Transactions',
      description: 'Gérer vos transactions financières',
    },
    [Routes.ROUTE_OPERATIONS_ORDERS]: {
      title: 'Ordres',
      description: 'Gérer vos ordres d\'achat et de vente',
    },
    [Routes.ROUTE_OPERATIONS_TRANSFERT]: {
      title: 'Transferts',
      description: 'Gérer vos transferts entre comptes',
    },
    [Routes.ROUTE_EVOLUTION_MONTHLY_BUDGET]: {
      title: 'Budget mensuel',
      description: 'Suivez votre budget mensuel',
    },
    [Routes.ROUTE_EVOLUTION_ANNUAL]: {
      title: 'Évolution annuelle',
      description: 'Suivez l\'évolution de vos finances sur l\'année',
    },
    [Routes.ROUTE_PARAMETERS_ACCOUNTS]: {
      title: 'Comptes',
      description: 'Gérer vos comptes bancaires',
    },
    [Routes.ROUTE_PARAMETERS_CATEGORY]: {
      title: 'Catégories',
      description: 'Gérer vos catégories de dépenses',
    },
    [Routes.ROUTE_PARAMETERS_SUB_CATEGORY]: {
      title: 'Sous-catégories',
      description: 'Gérer vos sous-catégories de dépenses',
    },
    [Routes.ROUTE_PARAMETERS_TICKERS]: {
      title: 'Titres',
      description: 'Gérer vos titres financiers',
    },
  },
  form: {
    validation: {
      invalid_date: 'La date est invalide',
      positive_amount: 'Le montant doit être un nombre positif',
      required_field: 'Le champ est requis',
    },
  },
  common: {
    treasury: 'Trésorerie',
    incomes: 'Revenus',
    expenses: 'Dépenses',
    savings: 'Épargnes',
    accounts: 'Comptes',
  },
  // actions
  action: {
    edit: 'Modifier',
    back: 'Retour',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    search: 'Rechercher',
    add: 'Ajouter',
    authenticate: 'Me connecter',
    disconnect: 'Me déconnecter',
    keep_editing: 'Rester sur la page',
    close_without_saving: 'Fermer sans sauvegarder',
  },
  // common labels
  label: {
    creation_date: 'Date de création',
    loading: 'Chargement...',
  },
  // common messages
  message: {
    changes_saved: 'Les modifications ont bien été enregistrées',
    unsaved_data: 'Des modifications n\'ont pas été enregistrées. '
      + 'Si vous voulez enregistrer ces modifications, cliquez sur le bouton "Rester sur la page"',
    confirm_delete: 'Pour confirmer la suppression, cliquez sur le bouton "Supprimer"',
    side: {
      [TransactionSide.DEBIT]: 'Dépense',
      [TransactionSide.CREDIT]: 'Gain',
    },
    tickerCategory: {
      [TickerCategory.CAPITALIZING]: 'Capitalisant',
      [TickerCategory.NON_CAPITALIZING]: 'Non capitalisant',
      [TickerCategory.GUARANTEED]: 'Garanti',
      [TickerCategory.BLOCKED_GUARANTEED]: 'Garanti bloqué',
    },
    orderSide: {
      [OrderSide.BUY]: 'Achat',
      [OrderSide.SELL]: 'Vente',
    },
  },
  // errors
  error: {
    unknownChoice: 'Choix inconnu',
    field: {
      required: 'Le champ est requis',
      email_wrong_format: 'L\'adresse e-mail saisie semble être incorrecte',
    },
  },
  'http-errors': {
    INTERNAL_ERROR: 'Une erreur inattendue s\'est produite',
    NETWORK_ERROR: 'Erreur réseau, votre connexion internet semble indisponible',
    TIMEOUT_ERROR: 'Erreur réseau (timeout), votre connexion internet ou le serveur distant semble indisponible',
    FORBIDDEN_ERROR: 'Il semble que vous n\'avez pas accès à cette ressource ou à cette action',
    WRONG_LOGIN_OR_PASSWORD: 'Nom d\'utilisateur ou mot de passe incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => `Suite à des erreurs dans la saisie de vos identifiants, votre compte est verrouillé pendant ${seconds} secondes, veuillez-vous reconnecter ultérieurement`,
    FIELD_REQUIRED: (fieldName: string) => `Le champ '${fieldName}' est requis`,
    MESSAGE: (message: string) => message,
  },
  pagination: {
    pageInfo: (currentPage: number, totalPage: number) => `${currentPage}/${totalPage}`,
  },
  sidebar: {
    dashboard: {
      title: 'Dashboard',
    },
    parameters: {
      title: 'Paramètres',
      tickers: 'Titres',
      accounts: 'Comptes',
      categories: 'Catégories',
      subCategories: 'Sous-catégories',
    },
    operations: {
      title: 'Opérations',
      transactions: 'Transactions',
      orders: 'Ordres',
      transfert: 'Transfert',
    },
    evolution: {
      title: 'Évolution',
      treasury: 'Trésorerie',
      graph: 'Graphiques',
      monthlyBudget: 'Budget mensuel',
      annual: 'Récapitulatif annuel',
    },
  },
  parameters: {
    categories: {
      table: {
        name: 'Nom',
        numberOfSubCategories: 'Nombre de sous-catégories',
        action: 'Action',
      },
    },
    subCategories: {
      table: {
        name: 'Nom',
        categoryName: 'Nom de la catégorie',
        action: 'Action',
      },
    },
    tickers: {
      table: {
        name: 'Nom',
        shortName: 'Nom court',
        category: 'Catégorie',
        action: 'Action',
      },
    },
  },
  evolution: {
    monthlyBudget: {
      viewTypes: {
        REAL: 'Réel',
        THEORETICAL: 'Théorique',
      },
      table: {
        category: 'Catégorie',
        stockFees: 'Frais de bourse',
        totalSavings: 'Total épargné',
        spent: 'Dépensé',
        budgeted: 'Budgété',
        spentPercentage: '% dépensé/budgeté',
        totalPercentage: '% dépensé/revenu',
        total: 'Total',
        totalWithoutSavings: 'Total sans épargne',
        balance: 'Solde',
        balanceWithoutSavings: 'Solde sans épargne',
      },
    },
    annual: {
      subTotal: 'Sous-total',
      recap: 'Récapitulatif',
      amount: 'Montant',
      shortName: 'ID',
      name: 'Compte',
      total: 'Total',
      gainLoss: 'Gain/Perte',
      percentage: '%',
      interest: 'Intérêts',
      checking: 'Comptes courants',
      savings: 'Épargnes',
      market: 'Investissements',
    },
  },
  operations: {
    transactions: {
      table: {
        date: 'Date',
        amount: 'Montant',
        accountName: 'Compte',
        subCategoryName: 'Sous-catégorie',
        comment: 'Commentaire',
        tag: 'Tag',
        fromToPersonName: 'De/À',
        action: 'Action',
      },
      form: {
        title: 'Création d\'une transaction',
        description: 'Ajout d\'une transaction',
        fields: {
          from: 'De',
          to: 'Vers',
          [TransactionFields.DATE]: 'Le',
          [TransactionFields.IN_BANK_DATE]: 'Réconcilié le',
          [TransactionFields.AMOUNT]: 'Montant',
          [TransactionFields.ACCOUNT]: 'Compte',
          [TransactionFields.SIDE]: 'Débit/Crédit',
          [TransactionFields.SUBCATEGORY]: 'Sous-catégorie',
          [TransactionFields.FROM_TO_PERSON]: 'De/À',
          [TransactionFields.COMMENT]: 'Commentaire',
          [TransactionFields.TAG]: 'Tag',
        },
      },
    },
    transferts: {
      table: {
        date: 'Date',
        amount: 'Montant',
        fromAccountName: 'Source',
        toAccountName: 'Destination',
        action: 'Action',
      },
      form: {
        title: 'Transfert',
        description: 'Ajout d\'un transfert entre comptes',
        fields: {
          [TransfertFields.FROM_ACCOUNT]: 'Compte source',
          [TransfertFields.TO_ACCOUNT]: 'Compte destination',
          [TransfertFields.AMOUNT]: 'Montant',
          [TransfertFields.DATE]: 'Date',
        },
      },
    },
    orders: {
      table: {
        date: 'Date',
        name: 'Nom',
        side: 'Type',
        quantity: 'Quantité',
        amount: 'Montant',
        charges: 'Frais',
        accountName: 'Compte',
        tickerCategory: 'Catégorie',
        tickerName: 'Titre',
        buy: 'Achat',
        sell: 'Vente',
        noOrders: 'Aucun ordre à afficher',
      },
      form: {
        title: 'Ordre',
        description: 'Ajout d\'un ordre de bourse',
        fields: {
          [OrderFields.DATE]: 'Date',
          [OrderFields.ACCOUNT]: 'Compte',
          [OrderFields.TICKER]: 'Titre',
          [OrderFields.SIDE]: 'Type',
          [OrderFields.AMOUNT]: 'Montant',
          [OrderFields.QUANTITY]: 'Quantité',
          [OrderFields.CHARGES]: 'Frais',
        },
      },
      buy: 'Achat',
      sell: 'Vente',
      noOrders: 'Aucun ordre à afficher',
    },
  },
  dashboard: {
    cards: {
      fromLastMonth: 'depuis le mois dernier',
    },
    charts: {
      title: 'Évolution total par mois',
    }
  },
} as const;

export default frMessages;
