const API_URL = 'http://localhost:1337'

export async function listLogEntries(){
  const response = await fetch(`${API_URL}/api/sales`)  
  return response.json();
}