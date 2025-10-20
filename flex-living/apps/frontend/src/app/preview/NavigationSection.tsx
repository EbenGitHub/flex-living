"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropDown';
import { Button } from "@flex-living/ui/forms";
import { Briefcase, Building2, ChevronDown, Info, Mail } from "lucide-react";

const NavigationSection = () => {
  return (
   <nav className="bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-light text-foreground">
            <Building2 className="w-6 h-6" />
            <span>the flex.</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Building2 className="w-4 h-4" />
                  Landlords
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>List Your Property</DropdownMenuItem>
                <DropdownMenuItem>Property Management</DropdownMenuItem>
                <DropdownMenuItem>Resources</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="gap-2">
              <Info className="w-4 h-4" />
              About Us
            </Button>

            <Button variant="ghost" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Careers
            </Button>

            <Button variant="ghost" className="gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </Button>

            <div className="flex items-center gap-4 pl-4 border-l border-border">
              <Button variant="ghost" size="sm">
                🇬🇧 English
              </Button>
              <Button variant="ghost" size="sm">
                £ GBP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationSection;
