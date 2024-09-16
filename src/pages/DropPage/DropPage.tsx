import { FC, useState, useEffect } from 'react';
import {ErrorPage} from "@/pages/ErrorPage/ErrorPage.tsx";
import walletPng from "@/resources/images/wallet.png"
import './DropPage.css';
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import eruda from 'eruda'

interface Drop {
	_id: string;
	name: string;
	prizeCount: number;
	icon: string;
}

const hostName = "nemitor.ru:3000"

export const DropPage: FC = () => {
	const [drops, setDrops] = useState<Drop[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const wallet = useTonWallet();
	const [tonConnectUI] = useTonConnectUI();
	eruda.init()
	useEffect(() => {
		const fetchDrops = async () => {
			try {
				const response = await fetch(`https://${hostName}/api/getActiveDrops`);
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}
				const data = await response.json();
				setDrops(data);
			} catch (err) {
				console.error('Error fetching drops:', err);
				setError('Could not fetch drops. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchDrops();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <ErrorPage/>; // Возвращаем ErrorPage при ошибке
	}

	const connectWallet = () => {
		tonConnectUI.openModal().then()
	};


	return (
		<div className="container">
			<button className="connectButton" onClick={connectWallet}>
				<img src={walletPng} alt="wallet"/>
				{wallet ? 'Кошелек подключен' : 'Подключить кошелек'}
			</button>
			<h1 className="title">Active Drops</h1>
			<ul className="dropList">
				{drops.map(drop => (
					<li key={drop._id} className="dropItem">
						<img src={drop.icon} alt={drop.name} />
						<div>
							<h2>{drop.name}</h2>
							<p>Награда: {drop.prizeCount}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
