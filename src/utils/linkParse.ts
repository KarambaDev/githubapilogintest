type TDirection = "first" | "last" | "next" | "prev";
export type TPagination = { [k in TDirection]?: { link: string, page: number } }

function linkParse (link: string) {
  if (!link) return
  return Array.from(link.matchAll(/<.*?([\s\S]*?)>.*?rel=".*?([\s\S]*?)"/mig))
    .map((el) => {
      const direction: TDirection = el[2] as TDirection
      const link: string = el[1]
      const pageRegexp = new RegExp(/&page=(\d+)/, 'g')
      const pageNumber: any = pageRegexp.exec(link)
      return { link, direction, pageNumber: +pageNumber[1] }
    })
    .reduce((acc, el) => {
      acc[el.direction] = { link: el.link, page: el.pageNumber };
      return acc;
    }, {} as TPagination)
}

export default linkParse