import { useEffect } from 'react'

export default function MyApp() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = "/employee/list";
    }
  })
};
