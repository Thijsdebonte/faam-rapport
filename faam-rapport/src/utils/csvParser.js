import Papa from 'papaparse'

export function parseMetaCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data
          if (!data.length) return reject(new Error('CSV is leeg'))

          // Look for impressions and reach columns (case-insensitive, Dutch/English)
          const row = data[data.length - 1] // take last row (often totals) or sum
          const keys = Object.keys(row)

          const impressionsKey = keys.find(k =>
            /impressie|impression|vertoningen|vertoning/i.test(k)
          )
          const reachKey = keys.find(k =>
            /bereik|reach|uniek bereik|unique reach/i.test(k)
          )

          // If no totals row, sum all rows
          let impressions = 0
          let reach = 0

          data.forEach(r => {
            if (impressionsKey) {
              const val = parseNumber(r[impressionsKey])
              impressions += val
            }
            if (reachKey) {
              const val = parseNumber(r[reachKey])
              reach += val
            }
          })

          resolve({
            impressions: impressions || null,
            reach: reach || null,
            rawKeys: keys,
            rowCount: data.length,
          })
        } catch (err) {
          reject(err)
        }
      },
      error: reject,
    })
  })
}

export function parseClarityCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data
          if (!data.length) return reject(new Error('CSV is leeg'))

          const keys = Object.keys(data[0])

          const visitorsKey = keys.find(k =>
            /bezoeker|sessie|visitor|session|gebruiker|user/i.test(k)
          )
          const durationKey = keys.find(k =>
            /duur|duration|tijd|time/i.test(k)
          )
          const scrollKey = keys.find(k =>
            /scroll/i.test(k)
          )

          let totalVisitors = 0
          let totalDuration = 0
          let totalScroll = 0
          let count = 0

          data.forEach(r => {
            if (visitorsKey) totalVisitors += parseNumber(r[visitorsKey])
            if (durationKey) totalDuration += parseNumber(r[durationKey])
            if (scrollKey) totalScroll += parseNumber(r[scrollKey])
            count++
          })

          resolve({
            visitors: totalVisitors || null,
            avgDuration: count > 0 && totalDuration ? Math.round(totalDuration / count) : null,
            avgScroll: count > 0 && totalScroll ? Math.round(totalScroll / count) : null,
            rawKeys: keys,
            rowCount: data.length,
          })
        } catch (err) {
          reject(err)
        }
      },
      error: reject,
    })
  })
}

function parseNumber(val) {
  if (val === null || val === undefined || val === '') return 0
  const cleaned = String(val).replace(/[^\d.,]/g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}
