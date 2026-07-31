"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SITE } from "@/data/site";
import { AlertTriangle, CheckCircle2, Send } from "lucide-react";

export default function ReportBugForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    page_url: "",
    issue_type: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);

  const update = (k) => (e) =>
    setValues((prev) => ({ ...prev, [k]: e?.target?.value ?? e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.description) {
      toast.error("Please share your email and describe the issue.");
      return;
    }
    setSubmitting(true);
    try {
      if (SITE.formspree) {
        const res = await fetch(SITE.formspree, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
      } else {
        // Fallback: build a mailto link
        const body = encodeURIComponent(
          `Name: ${values.name}\nEmail: ${values.email}\nPage: ${values.page_url}\nIssue: ${values.issue_type}\n\n${values.description}`
        );
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
          "Bug Report — NaukariGPT"
        )}&body=${body}`;
      }
      setOk(true);
      toast.success("Thanks! We’ll look into it shortly.");
      setValues({ name: "", email: "", page_url: "", issue_type: "", description: "" });
    } catch (err) {
      toast.error("Couldn’t submit right now. Please email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      data-testid="report-bug-form"
      className="rounded-[var(--radius-lg)] card-elev p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="rb-name">Name</Label>
          <Input
            id="rb-name"
            value={values.name}
            onChange={update("name")}
            placeholder="Your name (optional)"
            data-testid="report-bug-name"
          />
        </div>
        <div>
          <Label htmlFor="rb-email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="rb-email"
            type="email"
            required
            value={values.email}
            onChange={update("email")}
            placeholder="you@example.com"
            data-testid="report-bug-email"
          />
        </div>
        <div>
          <Label htmlFor="rb-url">Page URL</Label>
          <Input
            id="rb-url"
            value={values.page_url}
            onChange={update("page_url")}
            placeholder="https://naukarigpt.com/..."
            data-testid="report-bug-url"
          />
        </div>
        <div>
          <Label htmlFor="rb-type">Issue type</Label>
          <Select
            value={values.issue_type}
            onValueChange={(v) => setValues((prev) => ({ ...prev, issue_type: v }))}
          >
            <SelectTrigger id="rb-type" data-testid="report-bug-type">
              <SelectValue placeholder="Choose an issue type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="broken_link">Broken apply link</SelectItem>
              <SelectItem value="wrong_info">Wrong information</SelectItem>
              <SelectItem value="ui_bug">UI / display bug</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="rb-desc">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="rb-desc"
          required
          value={values.description}
          onChange={update("description")}
          rows={5}
          placeholder="Describe the issue with as much detail as possible…"
          data-testid="report-bug-description"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          We usually respond within 48 hours.
        </p>
        <Button
          type="submit"
          disabled={submitting}
          data-testid="report-bug-submit-button"
          className="btn-glow-hover"
        >
          {submitting ? "Sending…" : (
            <>
              <Send className="mr-2 h-4 w-4" /> Submit Report
            </>
          )}
        </Button>
      </div>
      {ok && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4" /> Report submitted — thank you!
        </p>
      )}
      {!SITE.formspree && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 px-3 py-2 text-xs text-yellow-300">
          <AlertTriangle className="h-3.5 w-3.5" /> No Formspree endpoint set — form falls back to email at {SITE.email}.
        </p>
      )}
    </form>
  );
}
