import React, { useState } from "react"
import { signIn, signUp } from 'aws-amplify/auth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthModal({ handleAuth }: { handleAuth: () => void }) {

  const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});
	
	const [signupData, setSignupData] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});


	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			console.log({loginData})
			await signIn({ username: loginData.email, password: loginData.password });
			handleAuth();
		} catch (err) {
			console.error('Login error:', err);
			alert("Invalid email or password")
		}
	}

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (signupData.password !== signupData.confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			await signUp({
				username: signupData.email,
				password: signupData.password,
				options: {
					userAttributes: {
						email: signupData.email,
					}
				}
			});
			handleAuth();
		} catch (err) {
			console.error('Signup error:', err);
			alert("Invalid email or password")
		}
	}

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login or Sign Up</DialogTitle>
          <DialogDescription>Enter your details to access your account or create a new one.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="col-span-3" 
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({
                      ...loginData,
                      email: e.target.value
                    })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="col-span-3" 
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({
                      ...loginData,
                      password: e.target.value
                    })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Login</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
					<form onSubmit={handleSignup}>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="signup-email" className="text-right">
									Email
								</Label>
								<Input 
									id="signup-email" 
									type="email" 
									className="col-span-3" 
									required
									value={signupData.email}
									onChange={(e) => setSignupData({
										...signupData,
										email: e.target.value
									})}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="signup-password" className="text-right">
									Password
								</Label>
								<Input 
									id="signup-password" 
									type="password" 
									className="col-span-3" 
									required
									value={signupData.password}
									onChange={(e) => setSignupData({
										...signupData,
										password: e.target.value
									})}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="confirm-password" className="text-right">
									Confirm
								</Label>
								<Input 
									id="confirm-password" 
									type="password" 
									className="col-span-3" 
									required
									value={signupData.confirmPassword}
									onChange={(e) => setSignupData({
										...signupData,
										confirmPassword: e.target.value
									})}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Sign Up</Button>
						</DialogFooter>
					</form>
          </TabsContent>
        </Tabs>
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
          Sign in with Google
        </Button> */}
      </DialogContent>
    </Dialog>
  )
}

