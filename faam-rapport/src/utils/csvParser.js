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

          // Sum all data rows for Weergaven (impressions) and Bereik (reach)
          let impressions = 0
          let reach = 0

          data.forEach(row => {
            impressions += parseNumber(row['Weergaven'])
            reach += parseNumber(row['Bereik'])
          })

          if (impressions === 0 && reach === 0) {
            const keys = Object.keys(data[0])
            return reject(new Error(
              `Kolommen 'Weergaven' en 'Bereik' niet gevonden. Gevonden kolommen: ${keys.join(', ')}`
            ))
          }

          resolve({
            impressions: impressions || null,
            reach: reach || null,
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
      header: false,
      skipEmptyLines: false,
      complete: (results) => {
        try {
          const rows = results.data

          let visitors = null
          let avgDuration = null
          let avgScroll = null
          let inScrollSection = false
          let inActiveTimeSection = false

          for (let i = 0; i < rows.length; i++) {
            const row = rows[i]
            const cols = row.map(c => String(c).trim())

            // Detect section headers
            if (cols.includes('Schuifdiepte')) {
              inScrollSection = true
              inActiveTimeSection = false
              continue
            }
            if (cols.includes('Actieve tijd besteed')) {
              inActiveTimeSection = true
              inScrollSection = false
              continue
            }
            // Any new "Metrisch" section header resets both
            if (cols[0] === 'Metrisch') {
              inScrollSection = false
              inActiveTimeSection = false
            }

            // "Totaal aantal sessies" → third column is value
            if (cols.some(c => c === 'Totaal aantal sessies')) {
              const valIdx = cols.findIndex(c => c === 'Totaal aantal sessies') + 1
              visitors = parseNumber(cols[valIdx])
            }

            // Under Schuifdiepte: "Gemiddeld" → next col is scroll%
            if (inScrollSection && cols.some(c => c === 'Gemiddeld')) {
              const valIdx = cols.findIndex(c => c === 'Gemiddeld') + 1
              avgScroll = parseNumber(cols[valIdx])
              inScrollSection = false
            }

            // Under Actieve tijd besteed: "Actieve tijd" → next col is seconds
            if (inActiveTimeSection && cols.some(c => c === 'Actieve tijd')) {
              const valIdx = cols.findIndex(c => c === 'Actieve tijd') + 1
              avgDuration = Math.round(parseNumber(cols[valIdx]))
              inActiveTimeSection = false
            }
          }

          if (visitors === null && avgDuration === null && avgScroll === null) {
            return reject(new Error(
              'Kon geen bekende Clarity-metrics vinden. Controleer of dit een Clarity dashboard-export is.'
            ))
          }

          resolve({
            visitors,
            avgDuration,
            avgScroll: avgScroll !== null ? Math.round(avgScroll) : null,
            rowCount: rows.length,
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
  // Handle Dutch number formatting: 1.987 (thousands) or 44,4 (decimal)
  const s = String(val).trim()
  // Remove quotes, currency symbols, spaces
  const cleaned = s.replace(/[^0-9.,\-]/g, '')
  // If both . and , present, the last one is the decimal separator
  const lastDot = cleaned.lastIndexOf('.')
  const lastComma = cleaned.lastIndexOf(',')
  let normalized
  if (lastDot > lastComma) {
    // e.g. "1,234.56" — dot is decimal
    normalized = cleaned.replace(/,/g, '')
  } else if (lastComma > lastDot) {
    // e.g. "1.234,56" or "44,4" — comma is decimal
    normalized = cleaned.replace(/\./g, '').replace(',', '.')
  } else {
    normalized = cleaned
  }
  return parseFloat(normalized) || 0
}
