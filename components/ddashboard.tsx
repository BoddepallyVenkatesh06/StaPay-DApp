/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ohPrvnCWnAX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Archivo } from 'next/font/google'
import { Rethink_Sans } from 'next/font/google'

archivo({
  subsets: ['latin'],
  display: 'swap',
})

rethink_sans({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import Link from "next/link";
import { useState, useMemo } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConnectButton, useAutoConnectWallet } from "@mysten/dapp-kit";
import { ConnectedAccount } from "./ui/ConnectedAccount";

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    symbol: "",
    type: "",
    status: "",
  });
  const [sort, setSort] = useState({
    key: "date",
    order: "desc",
  });
  const trades = [
    {
      id: 1,
      symbol: "BTC/USDT",
      type: "Buy",
      status: "Filled",
      price: 50000,
      volume: 0.1,
      date: "2023-04-01",
    },
    {
      id: 2,
      symbol: "ETH/USDT",
      type: "Sell",
      status: "Filled",
      price: 2000,
      volume: 0.5,
      date: "2023-04-02",
    },
    {
      id: 3,
      symbol: "LINK/USDT",
      type: "Buy",
      status: "Pending",
      price: 15,
      volume: 20,
      date: "2023-04-03",
    },
    {
      id: 4,
      symbol: "BTC/USDT",
      type: "Sell",
      status: "Filled",
      price: 51000,
      volume: 0.05,
      date: "2023-04-04",
    },
    {
      id: 5,
      symbol: "ETH/USDT",
      type: "Buy",
      status: "Filled",
      price: 1950,
      volume: 0.3,
      date: "2023-04-05",
    },
  ];
  const filteredTrades = useMemo(() => {
    return trades
      .filter((trade) => {
        const searchValue = search.toLowerCase();
        return (
          trade.symbol.toLowerCase().includes(searchValue) ||
          trade.type.toLowerCase().includes(searchValue) ||
          trade.status.toLowerCase().includes(searchValue)
        );
      })
      .filter((trade) => {
        if (filters.symbol && trade.symbol !== filters.symbol) {
          return false;
        }
        if (filters.type && trade.type !== filters.type) {
          return false;
        }
        if (filters.status && trade.status !== filters.status) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sort.order === "asc") {
          return a[sort.key] > b[sort.key] ? 1 : -1;
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1;
        }
      });
  }, [search, filters, sort]);
  const totalTrades = filteredTrades.length;
  const totalVolume = filteredTrades.reduce(
    (acc, trade) => acc + trade.volume,
    0
  );
  const totalPnl = filteredTrades.reduce((acc, trade) => {
    if (trade.type === "Buy") {
      return acc - trade.price * trade.volume;
    } else {
      return acc + trade.price * trade.volume;
    }
  }, 0);

  const autoConnectionStatus = useAutoConnectWallet();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#240046] to-[#0e011a] text-[#FFCC00]">
      <div className="flex-1">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-[#240046] to-[#0e011a] px-4 py-3 shadow-md md:px-8">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold" prefetch={false}>
              <img width={160} height={"auto"} src="/logo.jpg" alt="" />
            </Link>

            <ConnectButton />
          </div>
        </header>

        <ConnectedAccount></ConnectedAccount>

        <main className="p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{totalTrades}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {totalVolume.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>P&L</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-4xl font-bold ${totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {totalPnl.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Trading Records</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrades.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>{trade.date}</TableCell>
                        <TableCell>{trade.symbol}</TableCell>
                        <TableCell>
                          <Badge variant={"default"}>{trade.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={"default"}>{trade.status}</Badge>
                        </TableCell>
                        <TableCell>${trade.price.toFixed(2)}</TableCell>
                        <TableCell>{trade.volume.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}