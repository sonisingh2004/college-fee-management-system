import WebsiteFooter from "./WebsiteFooter";
import WebsiteHeader from "./WebsiteHeader";

export function WebsiteLayout({ children }) {
return (
<div className="min-h-screen flex flex-col bg-gray-50">
<WebsiteHeader />
<main className="flex-1 container mx-auto px-6 py-12">{children}</main>
<WebsiteFooter />
</div>
);
}


export default WebsiteLayout;