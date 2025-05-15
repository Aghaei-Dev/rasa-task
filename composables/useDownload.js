export const useDownload = () => {
  const downloadJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'posts.json'
    link.click()
  }

  const downloadExcel = (data) => {
    if (!data.length) return
    const headers = Object.keys(data[0])
    const csvRows = [headers.join(','), ...data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','))]
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'posts.csv'
    link.click()
  }

  return { downloadJSON, downloadExcel }
}
