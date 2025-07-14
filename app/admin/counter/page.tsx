"use client";

import { useState, useEffect } from "react";
import { BarChart3, Users2, Zap } from "lucide-react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/Select";
import { toast } from "react-hot-toast";

interface CounterItem {
  id: string;
  icon: string;
  end: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  color: string;
}

const defaultCounters: CounterItem[] = [
  {
    id: "1",
    icon: "BarChart3",
    end: 10,
    prefix: "$",
    suffix: " million",
    title: "Revenue Growth",
    description:
      "Generated over $10 million in additional revenue for our clients through innovative IT solutions",
    color: "primary",
  },
  {
    id: "2",
    icon: "Users2",
    end: 95,
    suffix: "%",
    title: "Client Satisfaction",
    description:
      "95% client satisfaction rate across all IT solutions and services we provide",
    color: "info",
  },
  {
    id: "3",
    icon: "Zap",
    end: 350,
    suffix: "+",
    title: "Completed Projects",
    description:
      "Our team successfully managed and executed 350+ projects with excellence",
    color: "success",
  },
];

const iconOptions = [
  { value: "BarChart3", label: "Bar Chart" },
  { value: "Users2", label: "Users" },
  { value: "Zap", label: "Zap" },
];

const colorOptions = [
  { value: "primary", label: "Primary" },
  { value: "info", label: "Info" },
  { value: "success", label: "Success" },
];

export default function CounterAdmin() {
  const [counters, setCounters] = useState<CounterItem[]>(defaultCounters);
  const [editingCounter, setEditingCounter] = useState<CounterItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch counters from API on mount
    const fetchCounters = async () => {
      try {
        const response = await fetch("/api/counter");
        if (response.ok) {
          const data = await response.json();
          setCounters(data.length > 0 ? data : defaultCounters);
        }
      } catch (error) {
        toast.error("Failed to fetch counters");
      }
    };
    fetchCounters();
  }, []);

  const handleEdit = (counter: CounterItem) => {
    setEditingCounter(counter);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCounter) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/counter", {
        method: editingCounter.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCounter),
      });

      if (response.ok) {
        const updatedCounter = await response.json();
        setCounters((prev) =>
          prev.some((c) => c.id === updatedCounter.id)
            ? prev.map((c) => (c.id === updatedCounter.id ? updatedCounter : c))
            : [...prev, updatedCounter]
        );
        setEditingCounter(null);
        toast.success("Counter saved successfully");
      } else {
        toast.error("Failed to save counter");
      }
    } catch (error) {
      toast.error("Failed to save counter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof CounterItem, value: string | number) => {
    setEditingCounter((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Counters</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Counter List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Counters</h2>
          <div className="space-y-4">
            {counters.map((counter) => (
              <Card
                key={counter.id}
                className="p-4 hover:bg-muted cursor-pointer transition-colors"
                onClick={() => handleEdit(counter)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{counter.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {counter.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Edit Form */}
        {editingCounter && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Counter</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <Select
                  value={editingCounter.icon}
                  onValueChange={(value) => handleChange("icon", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Value
                </label>
                <Input
                  type="number"
                  value={editingCounter.end}
                  onChange={(e) => handleChange("end", Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prefix</label>
                <Input
                  value={editingCounter.prefix || ""}
                  onChange={(e) => handleChange("prefix", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Suffix</label>
                <Input
                  value={editingCounter.suffix || ""}
                  onChange={(e) => handleChange("suffix", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={editingCounter.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  value={editingCounter.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <Select
                  value={editingCounter.color}
                  onValueChange={(value) => handleChange("color", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingCounter(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
