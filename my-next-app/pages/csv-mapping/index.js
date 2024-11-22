import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Papa from "papaparse";

export default function CsvMapping() {
  const { data: session, status } = useSession();
  const [csvData, setCsvData] = useState(null);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [mappedData, setMappedData] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: hasHeaders,
        skipEmptyLines: true,
        complete: (results) => setCsvData(results.data),
      });
    }
  };

  const handleMappingSubmit = () => {
    const jsonMapping = {};
    csvData.forEach((row, index) => {
      Object.keys(row).forEach((column) => {
        jsonMapping[column] = mappedData[column] || row[column];
      });
    });
    const blob = new Blob([JSON.stringify(jsonMapping, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mapping.json";
    a.click();
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please log in first</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>CSV Mapping</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <label>
        <input
          type="checkbox"
          checked={hasHeaders}
          onChange={(e) => setHasHeaders(e.target.checked)}
        />
        File has headers
      </label>
      {csvData && (
        <div>
          <table border="1" style={{ margin: "auto", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Sample Value</th>
                <th>Mapped Label</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(csvData[0]).map((column, idx) => (
                <tr key={idx}>
                  <td>{column}</td>
                  <td>{csvData[0][column]}</td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        setMappedData({
                          ...mappedData,
                          [column]: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleMappingSubmit} style={{ marginTop: "20px" }}>
            Generate JSON
          </button>
        </div>
      )}
      <button onClick={() => signOut()} style={{ marginTop: "20px" }}>
        Sign Out
      </button>
    </div>
  );
}
