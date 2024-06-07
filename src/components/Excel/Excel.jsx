import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import './Excel.scss'

function ExcelMerger() {
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [mergedData, setMergedData] = useState([])
  const [editedData, setEditedData] = useState([])
  const [downloadLink, setDownloadLink] = useState(null)
  const [isFilesMerged, setIsFilesMerged] = useState(false)

  const handleFile1Change = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const data1 = XLSX.utils.sheet_to_json(sheet)
      setFile1(data1)
    }
    reader.readAsArrayBuffer(file)
  }

  const handleFile2Change = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const data2 = XLSX.utils.sheet_to_json(sheet)
      setFile2(data2)
    }
    reader.readAsArrayBuffer(file)
  }

  const generateDownloadLink = () => {
    const workbook = XLSX.utils.book_new()
    const sheet = XLSX.utils.json_to_sheet(editedData)
    XLSX.utils.book_append_sheet(workbook, sheet, 'MergedData')
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    const blobData = new Blob([excelData], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blobData)
    setDownloadLink(url)
  }

  useEffect(() => {
    generateDownloadLink()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedData])

  const mergeFiles = () => {
    if (file1 && file2) {
      const workbook = XLSX.utils.book_new()

      const sheet1 = XLSX.utils.json_to_sheet(file1)
      XLSX.utils.book_append_sheet(workbook, sheet1, 'Sheet1')

      const sheet2 = XLSX.utils.json_to_sheet(file2)
      XLSX.utils.book_append_sheet(workbook, sheet2, 'Sheet2')

      const mergedData1 = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1'])
      const mergedData2 = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet2'])

      const columnHeaders = new Set([
        ...Object.keys(mergedData1[0] || {}),
        ...Object.keys(mergedData2[0] || {}),
      ])

      const mergedData = []

      for (let row of mergedData1) {
        const newRow = {}
        for (let column of columnHeaders) {
          newRow[column] = row[column] || ''
        }
        mergedData.push(newRow)
      }

      for (let row of mergedData2) {
        const newRow = {}
        for (let column of columnHeaders) {
          newRow[column] = row[column] || ''
        }
        mergedData.push(newRow)
      }

      setMergedData(mergedData)
      setEditedData(mergedData)
      setIsFilesMerged(true)
    }
  }

  const handleEditCell = (rowIndex, columnName, value) => {
    const updatedData = [...editedData]
    updatedData[rowIndex][columnName] = value
    setEditedData(updatedData)
  }

  return (
    <div className='excel-merger'>
      <div>
        <input
          className='file-input button'
          type='file'
          onChange={handleFile1Change}
        />
        <input
          className='file-input button'
          type='file'
          onChange={handleFile2Change}
        />
      </div>
      <button className='merge-button button' onClick={mergeFiles}>
        Объединить файлы
      </button>

      <table className='table'>
        <thead>
          <tr>
            {Object.keys(mergedData[0] || {}).map((key, index) => (
              <th key={index}>{key}</th>))}
          </tr>
        </thead>
        {mergedData.length === 0 && (
          <tbody>
            <tr>
              <td className='no-data' colSpan='4'>Выберите файлы для объединения</td>
            </tr>
          </tbody>
        )}
        {mergedData.length > 0 && (
          <tbody>
            {editedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(row).map(([columnName, value], cellIndex) => (
                  <td key={cellIndex}>
                    <input
                      type="text"
                      value={value}
                      onChange={e => handleEditCell(rowIndex, columnName, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {downloadLink && isFilesMerged && (
        <a className='download-link' href={downloadLink} download='merged.xlsx'>
          Скачать объединенный файл
        </a>
      )}
    </div>
  )
}

export default ExcelMerger