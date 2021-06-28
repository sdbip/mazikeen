import { Show, Details } from "./Show";

export type SuccessResult<T> = ['success', T]
export type ErrorResult = ['error', string, string]

export async function findShows(searchText: string): Promise<SuccessResult<Show[]> | ErrorResult> {
  try {
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchText}`);
    const json = await response.json();
    if (!response.ok)
      return ['error', 'TV Maze returned an error response', json.message];  

    return [
      'success',
      json.map((o: any) => ({
        id: o.show.id,
        title: o.show.name,
        url: o.show._links.self.href,
        image: o.show.image?.medium
      }))
    ]
  }
  catch (error) {
    return ['error', 'Error connecting to TV Maze', error.message];
  }
}

export async function getDetails(show: Show): Promise<SuccessResult<Details> | ErrorResult> {
  try {
    const response = await fetch(show.url)
    const json = await response.json();
    if (!response.ok)
      return ['error', 'TV Maze returned an error response', json.message];  

    return [
      'success',
      {
        name: json.name,
        year: json.premiered && new Date(Date.parse(json.premiered)).getFullYear(),
        channel: json.network?.name ?? json.webChannel?.name,
        summary: json.summary,
        rating: json.rating.average,
        image: json.image?.original
      }
    ]
  }
  catch (error) {
    return ['error', 'Error connecting to TV Maze', error.message];
  }
}