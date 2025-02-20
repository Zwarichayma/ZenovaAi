const API_URL = "http://192.168.100.9:1337/api"
const TOKEN =
  "3bf5dd63e926b8274c69d0725cbcb58fff0557c122389deb3b1b05c891c62c9fc18917cfa1b913ea60731cc1687426d8d1b1df629e479c783ade7bdc261e025fb2189a84daf3c0fc38a7acc07aae9c809464955f0a1d68c7fd3d9d17c4855986c632f756cfd3a73c9ac714f84e484db0f547ccdf84613e6bdb9b5d1e36e7b2b9"

export interface TestAttributes {
  title: string
  documentId: string
  description: any[]
  questions: { question: string; options: string[] }[]
  image?: {
    data?: {
      attributes: {
        url: string
      }
    }
  }
}

export interface Test {
  id: number
  attributes: TestAttributes
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
}

// Fonction utilitaire pour construire l'URL avec les bonnes populations
const buildUrl = (endpoint: string, populate: string[]) => {
  const populateQuery = populate.map((field) => `populate=${field}`).join("&")
  return `${API_URL}/${endpoint}?${populateQuery}`
}

export const getTests = async (): Promise<Test[]> => {
  try {
    // On spécifie tous les champs à peupler
    const url = buildUrl("tests", ["image", "description", "questions"])
    console.log("Fetching URL:", url) // Pour le débogage

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Failed to fetch tests:", error)
    throw error
  }
}

export const getTestById = async (id: number): Promise<Test> => {
  try {
    const url = buildUrl(`tests/${id}`, ["image", "description", "questions"])
    console.log("Fetching URL:", url) // Pour le débogage

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error(`Failed to fetch test with id ${id}:`, error)
    throw error
  }
}

