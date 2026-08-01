"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { FILTER_OPTIONS } from "@/lib/postFilters";

const ALL = "all";

export default function FilterBar({ totalCount = 0, resultCount = 0 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = {
    state: searchParams.get("state") || ALL,
    department: searchParams.get("department") || ALL,
    qualification: searchParams.get("qualification") || ALL,
  };

  const hasFilters = useMemo(
    () =>
      Object.values(values).some((v) => v && v !== ALL && v !== ""),
    [values]
  );

  const update = (key) => (val) => {
    const currentSearch =
      typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(currentSearch);
    if (val === ALL || val === "") params.delete(key);
    else params.set(key, val);
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const clear = () => router.replace(pathname, { scroll: false });

  return (
    <div
      data-testid="filter-bar"
      className="mt-6 rounded-[var(--radius-lg)] card-elev p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/25 text-primary">
            <Filter className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Refine
            </p>
            <p className="text-sm font-medium leading-tight">
              Filter results
            </p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <FilterSelect
            label="State"
            testid="filter-state"
            value={values.state}
            onChange={update("state")}
            options={FILTER_OPTIONS.state}
          />
          <FilterSelect
            label="Department"
            testid="filter-department"
            value={values.department}
            onChange={update("department")}
            options={FILTER_OPTIONS.department}
          />
          <FilterSelect
            label="Eligibility"
            testid="filter-qualification"
            value={values.qualification}
            onChange={update("qualification")}
            options={FILTER_OPTIONS.qualification}
          />
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              data-testid="filter-clear-button"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
        <Badge variant="outline" className="font-mono text-[10px]">
          {resultCount} of {totalCount} posts
        </Badge>
        {hasFilters && (
          <>
            {values.state !== ALL && (
              <Badge className="bg-primary/15 text-primary border-primary/30">
                State: {values.state}
              </Badge>
            )}
            {values.department !== ALL && (
              <Badge className="bg-primary/15 text-primary border-primary/30">
                Dept: {values.department}
              </Badge>
            )}
            {values.qualification !== ALL && (
              <Badge className="bg-primary/15 text-primary border-primary/30">
                Eligibility: {values.qualification}
              </Badge>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ label, testid, value, onChange, options }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        data-testid={testid}
        className="h-9 w-full sm:w-[170px]"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectItem value={ALL}>All {label.toLowerCase() === "eligibility" ? "eligibilities" : `${label.toLowerCase()}s`}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
