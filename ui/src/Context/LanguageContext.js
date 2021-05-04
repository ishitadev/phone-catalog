import React from 'react'
import * as ActionNames from '../ActionNames';

var MobileCatalogStateContext = React.createContext()
var MobileCatalogDispatchContext = React.createContext()

function MobileCatalogReducer(state, action) {
	switch (action.type) {
		case ActionNames.ADD_MOBILE_CATALOG:
			return { ...state, mobilecatalog: action.data.mobilecatalog, error: null }
		case ActionNames.ADD_MOBILE_CATALOG_FAILED:
			return { ...state, error: action.data.error, mobilecatalog: null }
		case ActionNames.MOBILE_CATALOG_LIST:
			return { ...state, mobilecatalogs: action.data.mobilecatalogs }
		case ActionNames.REMOVE_MOBILE_CATALOG:
			return { ...state, mobilecatalog: null }
		case ActionNames.GET_MOBILE_CATALOG:
			return { ...state, mobilecatalog: action.data.mobilecatalog }
		case ActionNames.UPDATE_MOBILE_CATALOG:
			return { ...state, mobilecatalog: null }
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function MobileCatalogProvider({ children }) {
	var [state, dispatch] = React.useReducer(MobileCatalogReducer, {
		mobilecatalog: null,
		mobilecatalogs: [],
		error: null,
	})

	return (
		<MobileCatalogStateContext.Provider value={state}>
			<MobileCatalogDispatchContext.Provider value={dispatch}>
				{children}
			</MobileCatalogDispatchContext.Provider>
		</MobileCatalogStateContext.Provider>
	)
}

function useMobileCatalogState() {
	var context = React.useContext(MobileCatalogStateContext)
	if (context === undefined) {
		throw new Error('useMobileCatalogState must be used within a MobileCatalogProvider')
	}
	return context
}

function useMobileCatalogDispatch() {
	var context = React.useContext(MobileCatalogDispatchContext)
	if (context === undefined) {
		throw new Error('useMobileCatalogDispatch must be used within a MobileCatalogProvider')
	}
	return context
}

export { MobileCatalogProvider, useMobileCatalogState, useMobileCatalogDispatch }

