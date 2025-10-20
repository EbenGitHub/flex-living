"use client"
import { useState } from "react";
import Link from "next/link"
import { Input,Button } from "@flex-living/ui/forms";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@flex-living/ui/cards";
import { KeyRound, Shield } from "lucide-react";

const Auth = () => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic will go here
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary mb-2">The Flex</h1>
          </Link>
          <p className="text-muted-foreground">Property Management Portal</p>
        </div>

        <Card className="shadow-card border-primary/10">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Authentication</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientId" className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Client ID
                </Label>
                <Input
                  id="clientId"
                  type="text"
                  placeholder="Enter your client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                  className="transition-all focus:scale-[1.01]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientSecret" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Client Secret
                </Label>
                <Input
                  id="clientSecret"
                  type="password"
                  placeholder="Enter your client secret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  required
                  className="transition-all focus:scale-[1.01]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full mt-6 transition-transform hover:scale-[1.02]"
                size="lg"
              >
                Authenticate
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Need help? <Link href="/" className="text-primary hover:underline">Contact Support</Link></p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default Auth;
