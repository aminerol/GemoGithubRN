import axios from 'axios'

const instance = axios.create({ baseURL: 'https://api.github.com/' })
const parsRepos = (response) => response.data["items"]

export const searchReposAPI = (date, sort, order, perPage, page) => instance.get(`search/repositories`+
                                                                                 `?q=created:%3E${date}`+
                                                                                 `&sort=${sort}`+
                                                                                 `&order=${order}`+
                                                                                 `&per_page=${perPage}`+
                                                                                 `&page=${page}`
                                                                            ).then(parsRepos)