const API_URL = 'https://arcane-plains-20636.herokuapp.com'

export async function listLogEntries(){
  const response = await fetch(`${API_URL}/api/sales`)  
  return response.json();
}