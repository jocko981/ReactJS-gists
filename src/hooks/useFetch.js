import { useEffect, useState } from "react";

export const useFetch = (page) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options] = useState({
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json"
    }
  })

  // Note: up to 3000 gists! 100 pages with 30 gists per page (or 30 pages with 100 gists per page).
  const gists_per_page = 30
  const url = `https://api.github.com/gists/public?per_page=${gists_per_page}&page=${page}`
  const max_pages = 37

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)

      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()
        console.log("data", data);

        setData(data)
        setError(null)
        setIsPending(false)
      }

      catch (err) {
        if (err.name === "AbortError") {
          console.log("AbortError - the fetch was aborted.")
        } else {
          setIsPending(false)
          setError("Could not fetch the data.")
        }
      }
    }
    fetchData(options)

    return () => {
      controller.abort()
    }
  }, [page, url, options])


  return { data, isPending, error, max_pages }
}