import { useUtils } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonWallet,Locales, useTonConnectUI  } from '@tonconnect/ui-react';
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';

import './TONConnectPage.css';

export const Settings = () => {
	const [tonConnectUI, setOptions] = useTonConnectUI();

	const onLanguageChange = (lang: string) => {
		setOptions({ language: lang as Locales });
	};

	const myTransaction = {
		validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
		messages: [
			{
				address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
				amount: "20000000",
				// stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
			},
			{
				address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
				amount: "60000000",
				// payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
			}
		]
	}

	return (
		<div>
			<button onClick={() => tonConnectUI.sendTransaction(myTransaction)}>
				Send transaction
			</button>

			<div>
				<label>language</label>
				<select onChange={e => onLanguageChange(e.target.value)}>
					<option value="en">en</option>
					<option value="ru">ru</option>
				</select>
			</div>
		</div>
	);
};

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const utils = useUtils();

  if (!wallet) {
    return (
      <Placeholder
        className='ton-connect-page__placeholder'
        header='TON Connect'
        description={
          <>
            <Text>
              To display the data related to the TON Connect, it is required to connect your wallet
            </Text>
            <TonConnectButton className='ton-connect-page__button'/>
          </>
        }
      />
    );
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;

  return (
    <List>
      {'imageUrl' in wallet && (
        <>
          <Section>
            <Cell
              before={
                <Avatar src={wallet.imageUrl} alt='Provider logo' width={60} height={60}/>
              }
              after={<Navigation>About wallet</Navigation>}
              subtitle={wallet.appName}
              onClick={(e) => {

                e.preventDefault();
                utils.openLink(wallet.aboutUrl);
              }}
            >
              <Title level='3'>{wallet.name}</Title>
            </Cell>
          </Section>
          <TonConnectButton className='ton-connect-page__button-connected'/>
        </>
      )}
      <DisplayData
        header='Account'
        rows={[
          { title: 'Address', value: address },
          { title: 'Chain', value: chain },
          { title: 'Public Key', value: publicKey },
        ]}
      />
      <DisplayData
        header='Device'
        rows={[
          { title: 'App Name', value: appName },
          { title: 'App Version', value: appVersion },
          { title: 'Max Protocol Version', value: maxProtocolVersion },
          { title: 'Platform', value: platform },
          {
            title: 'Features',
            value: features
              .map(f => typeof f === 'object' ? f.name : undefined)
              .filter(v => v)
              .join(', '),
          },
        ]}
      />
		<Settings />
    </List>
  );
};
