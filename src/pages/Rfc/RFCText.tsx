import { ThemedLink } from '@/components/ThemedComponents'

export const RFCText = () => {
  return (
    <>
      <ThemedLink
        target="_blank"
        className="font-bold text-primary"
        to="https://github.com/polkadot-fellows/RFCs"
      >
        RFCs repository
      </ThemedLink>{' '}
      contains Proposals for change to standards administered by the Fellowship.
      RFCs are in practice only a signalling mechanism to determine and indicate
      the Fellowship's design and architecture preferences and to coordinate
      discussion and social consensus on architectures and designs according to
      open-source principles.
      <p>
        For any RFC concerning runtime logic or interfaces, the Fellowship's
        capabilities are bounded by relay-chain governance, which is the
        ultimate decider of what code is adopted for block processing.
      </p>
      <h1 className="my-4 flex-1 shrink-0 whitespace-nowrap font-unbounded text-xl font-semibold tracking-tight text-primary sm:grow-0">
        RFC lifecycle
      </h1>
      <p>
        The RFC process is open to all contributors. Anyone may open an RFC or
        provide comments on open RFCs.
      </p>
      <p>
        RFCs are submitted by PRs and undergo discussion before being put to an
        on-chain vote for decision by the Fellowship. A bot is set for proposing
        RFCs on-chain in a referendum: this can only be done by accounts that
        are part of the Fellowship.
      </p>
      <p>
        Once approved, an RFC will need to be taken by implementers (usually the
        authors of the RFC) who will complete all the required coding, testing,
        and documentation.
      </p>
      <p>
        PRs may be closed by their author and when sufficiently stale, as well -
        after a period of 1 year without acceptance.
      </p>
      <p>
        A list of all RFCs with their latest status can be found in the{' '}
        <ThemedLink
          to="https://spiced-longship-f1a.notion.site/abbeb769972f4aa0afbfe41cac4544f1?v=0e62d5198aa443d0a816165387b6ede9"
          target="_blank"
        >
          RFC Dashboard
        </ThemedLink>
        .
      </p>
    </>
  )
}
