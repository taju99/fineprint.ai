import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Fineprint.ai</h1>
          <p className="text-xl text-muted-foreground">
            AI-Powered Legal Document Simplification
          </p>
          <Badge variant="secondary">✅ shadcn/ui Setup Complete</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload</CardTitle>
              <CardDescription>
                Upload PDF documents or paste text for AI analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Try Upload
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analyze</CardTitle>
              <CardDescription>
                Get plain-English summaries and risk highlights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Try Analysis
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chat</CardTitle>
              <CardDescription>
                Ask questions and get instant answers about your document.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Try Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export</CardTitle>
              <CardDescription>
                Download annotated summaries and save for later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Try Export
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="flex gap-2 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="secondary" size="lg">Learn More</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
