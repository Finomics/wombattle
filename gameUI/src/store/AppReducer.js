export default (state, action) => {
    switch(action.type) {
      case 'DELETE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions]
        }
      case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload,
          web3LoadingErrorMessage: "",
          web3Loadded: true
        }
      case 'SETUP_CONTRACT':
        return {
          ...state,
          battleContract: action.payload
        }
        case 'SETUP_TOKEN':
        return {
          ...state,
          tokenContract: action.payload
        }
      case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }
        case 'SETUP_ALLOWANCE':
        return {
          ...state,
          allowance: action.payload
        }
        case 'UPDATE_POOLS':
        return {
          ...state,
          lottoPools: action.payload
        }
      case 'WEB3_LOADING_ERROR':
        return {
          ...state,
          web3LoadingErrorMessage: action.errorMessage,
          web3Loadded: false
        }
      default:
        return state;
    }
  }
