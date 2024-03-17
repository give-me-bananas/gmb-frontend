import { useState, useEffect } from "react";
import { normalize } from "viem/ens";
import { http, createPublicClient, PublicClient } from "viem";
import { sepolia } from "viem/chains";
import { EnsPublicClient, createEnsPublicClient } from "@ensdomains/ensjs";

type EnsDetails = {
  ensDescription: string;
  ensGithub: string;
  ensAvatar: string;
  ensTwitch: string;
  ensDiscord: string;
};

export const useGetEnsDetailsByName = (name: string) => {
  const [ensAddress, setEnsAddress] = useState<string>();
  const [ensDetails, setEnsDetails] = useState<EnsDetails>();
  const [viemClient, setViemClient] = useState<PublicClient>();

  useEffect(() => {
    // Viem client
    const vClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    setViemClient(vClient);
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      if (viemClient) {
        const normalizedEnsName = normalize(name ?? "");
        const myGithubPromise = viemClient.getEnsText({
          name: normalizedEnsName,
          key: "com.github",
        });

        const myDescriptionPromise = viemClient.getEnsText({
          name: normalizedEnsName,
          key: "gmb.description",
        });

        const myAvatarPromise = viemClient.getEnsText({
          name: normalizedEnsName,
          key: "avatar",
        });

        const myTwitchPromise = viemClient.getEnsText({
          name: normalizedEnsName,
          key: "com.twitch",
        });

        const myDiscordPromise = viemClient.getEnsText({
          name: normalizedEnsName,
          key: "com.discord",
        });

        const myAddressPromise = viemClient.getEnsAddress({
          name: normalizedEnsName,
        });

        const [
          myGithub,
          myDescription,
          myAvatar,
          myTwitch,
          myDiscord,
          myAddress,
        ] = await Promise.all([
          myGithubPromise,
          myDescriptionPromise,
          myAvatarPromise,
          myTwitchPromise,
          myDiscordPromise,
          myAddressPromise,
        ]);

        setEnsAddress(myAddress?.toString() ?? "");

        setEnsDetails({
          ensAvatar: myAvatar?.toString() ?? "",
          ensDescription: myDescription?.toString() ?? "",
          ensGithub: myGithub?.toString() ?? "",
          ensTwitch: myTwitch?.toString() ?? "",
          ensDiscord: myDiscord?.toString() ?? "",
        });
      }
    };
    getDetails();
  }, [viemClient]);

  return { address: ensAddress, records: ensDetails };
};

export const useGetEnsDetailsByAddress = (address: string) => {
  const [ensName, setEnsName] = useState<string>();
  const [ensDetails, setEnsDetails] = useState<EnsDetails>();
  const [pubClient, setPubClient] = useState<EnsPublicClient>();
  const [viemClient, setViemClient] = useState<PublicClient>();

  useEffect(() => {
    // ENS client
    const pClient = createEnsPublicClient({
      chain: sepolia,
      transport: http(),
    });
    // Viem client
    const vClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    setPubClient(pClient as EnsPublicClient);
    setViemClient(vClient);
  }, []);

  useEffect(() => {
    const getName = async () => {
      if (pubClient && address) {
        const myName = await pubClient.getName({
          address: address as `0x${string}`,
        });
        setEnsName(myName?.name ?? "");
      }
    };
    getName();
  }, [pubClient, address]);

  useEffect(() => {
    const getDetails = async () => {
      if (ensName && viemClient) {
        const normalizedEnsName = normalize(ensName ?? "");
        const myGithubPromise = viemClient.getEnsText({
          name: normalizedEnsName,
          key: "com.github",
        });

        const myDescriptionPromise = viemClient.getEnsText({
          name: normalizedEnsName,
          key: "gmb.description",
        });

        const myAvatarPromise = viemClient.getEnsText({
          name: normalize(ensName ?? ""),
          key: "avatar",
        });

        const myTwitchPromise = viemClient.getEnsText({
          name: normalize(ensName ?? ""),
          key: "com.twitch",
        });

        const myDiscordPromise = viemClient.getEnsText({
          name: normalize(ensName ?? ""),
          key: "com.discord",
        });

        const [myGithub, myDescription, myAvatar, myTwitch, myDiscord] =
          await Promise.all([
            myGithubPromise,
            myDescriptionPromise,
            myAvatarPromise,
            myTwitchPromise,
            myDiscordPromise,
          ]);

        setEnsDetails({
          ensAvatar: myAvatar?.toString() ?? "",
          ensDescription: myDescription?.toString() ?? "",
          ensGithub: myGithub?.toString() ?? "",
          ensTwitch: myTwitch?.toString() ?? "",
          ensDiscord: myDiscord?.toString() ?? "",
        });
      }
    };
    getDetails();
  }, [ensName, viemClient]);

  return { name: ensName, records: ensDetails };
};
