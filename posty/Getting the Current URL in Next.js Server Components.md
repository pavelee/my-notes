https://www.propelauth.com/post/getting-url-in-next-server-components

Pobieranie aktualnego URL w RSC nie jest oczywiste
W przypadku klienckiego komponentu możemy użyć usePathname

```js
import { usePathname } from "next/navigation";

// to nie zadziała bo to jest RSC a nie komponent kliencki
export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div>
            <SidebarOption path="/" name="Home" activePath={pathname} />
            <SidebarOption
                path="/billing"
                name="Billing"
                activePath={pathname}
            />
            <SidebarOption path="/admin" name="Admin" activePath={pathname} />
        </div>
    );
}
```

Jednym z możliwych rozwiazań jest zmiana komponentu serwerowego na kliencki, ale to nam zabiera korzyści z optmyalizacji, które daje RSC.

```js
// musimy go przekonwertować na komponent kliencki
"use client";

import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div>
            <SidebarOption path="/" name="Home" activePath={pathname} />
            <SidebarOption
                path="/billing"
                name="Billing"
                activePath={pathname}
            />
            <SidebarOption path="/admin" name="Admin" activePath={pathname} />
        </div>
    );
}
```

Możliwym rozwiązaniem jest przekazanie tego poprzez middleware.ts

Możemy to zrobić poprzez ustawienie ścieżki w nagłówkach odpowiedzi która finalnie trafi do serwerowego komponentu. To działa bo middleware może zmodfikować odpowiedź zanim trafi do klienta.

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Add a new header x-current-path which passes the path to downstream components
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        // match all routes except static files and APIs
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
```

Następnie w komponencie serwerowym

```js
import { headers } from "next/headers";

export default async function Sidebar() {
    const headerList = headers();
    // wyciągamy z nagłówków ścieżkę tak jak by to zwróciło usePathname 🥳
    const pathname = headerList.get("x-current-path");

    // ...etc
}
```
