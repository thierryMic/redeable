import { matchPath } from 'react-router'

export const getParamFromUrl = (url, param) => {
	const match = matchPath(url, {path: `/:${param}`, exact: true, strict: false})
    return match === null ? "" : match.params[param]
}