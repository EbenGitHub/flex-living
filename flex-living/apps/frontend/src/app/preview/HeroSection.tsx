"use client"
import { useState } from "react";
import { MapPin, Calendar, Users, Search, Minus, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@flex-living/ui/selects";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/PopOver";
import { Button } from "@flex-living/ui/forms";

const HeroSearch = () => {
  const [guests, setGuests] = useState(1);

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
      <div className="bg-card rounded-2xl shadow-hero p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="flex items-center gap-3 px-4 py-3 border-r border-border">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <Select defaultValue="london">
              <SelectTrigger className="border-0 shadow-none focus:ring-0 text-base">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="manchester">Manchester</SelectItem>
                <SelectItem value="birmingham">Birmingham</SelectItem>
                <SelectItem value="edinburgh">Edinburgh</SelectItem>
                <SelectItem value="glasgow">Glasgow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-3 border-r border-border hover:bg-transparent"
              >
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="text-base text-foreground">Dates</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <p className="text-sm text-muted-foreground">
                Date picker coming soon...
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between gap-3 px-4 py-3 hover:bg-transparent"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-base text-foreground">{guests} Guest{guests !== 1 ? 's' : ''}</span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Guests</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGuests(Math.min(20, guests + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default HeroSearch;
