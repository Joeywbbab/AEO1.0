import { useState, useCallback, useMemo } from "react"

export type FilterConfig<T> = {
  tags?: string[]
  intent?: string | null
  mentions?: string | null
  dateRange?: string
  model?: string
  customFilters?: Record<string, any>
}

export type UseFiltersReturn<T> = {
  filters: FilterConfig<T>
  setFilters: (filters: FilterConfig<T>) => void
  updateFilter: <K extends keyof FilterConfig<T>>(key: K, value: FilterConfig<T>[K]) => void
  clearFilters: () => void
  activeFilterCount: number
  applyFilters: (items: T[]) => T[]
}

export function useFilters<T extends Record<string, any>>(
  initialFilters: FilterConfig<T> = {},
  filterFn?: (item: T, filters: FilterConfig<T>) => boolean,
): UseFiltersReturn<T> {
  const [filters, setFiltersState] = useState<FilterConfig<T>>(initialFilters)

  const setFilters = useCallback((newFilters: FilterConfig<T>) => {
    setFiltersState(newFilters)
  }, [])

  const updateFilter = useCallback(
    <K extends keyof FilterConfig<T>>(key: K, value: FilterConfig<T>[K]) => {
      setFiltersState((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const clearFilters = useCallback(() => {
    setFiltersState({
      tags: [],
      intent: null,
      mentions: null,
      dateRange: undefined,
      model: undefined,
      customFilters: {},
    })
  }, [])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.tags && filters.tags.length > 0) count += filters.tags.length
    if (filters.intent) count += 1
    if (filters.mentions) count += 1
    if (filters.dateRange && filters.dateRange !== "30d") count += 1
    if (filters.model && filters.model !== "all") count += 1
    if (filters.customFilters) {
      count += Object.keys(filters.customFilters).length
    }
    return count
  }, [filters])

  const applyFilters = useCallback(
    (items: T[]) => {
      if (!filterFn) return items

      return items.filter((item) => filterFn(item, filters))
    },
    [filters, filterFn],
  )

  return {
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    activeFilterCount,
    applyFilters,
  }
}
