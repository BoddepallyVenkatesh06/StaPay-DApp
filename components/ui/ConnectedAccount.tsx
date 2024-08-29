import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEffect } from "react";

const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

export function ConnectedAccount() {
  const account = useCurrentAccount();

  useEffect(() => {
    (async function () {
      const events = await client.queryEvents({
        query: {
          Sender:
            "0x007dcc09755ab7423e7b0801694c0b05dd0d974043a7f890030fdd37b32681ab",
        },
        limit: 2,
      });

      console.log({ account, events });
    })();
  }, []);

  if (!account) {
    return null;
  }

  return <div></div>;
}
