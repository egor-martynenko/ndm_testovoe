import { useState } from 'react'
import './App.css'

interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

const initialRoutes: Route[] = [
  { uuid: '1', address: '192.168.1.1', mask: '255.255.255.0', gateway: '192.168.1.254', interface: 'eth0' },
  { uuid: '2', address: '10.0.0.1', mask: '255.0.0.0', gateway: '10.0.0.254', interface: 'eth1' },
  { uuid: '3', address: '172.16.0.1', mask: '255.240.0.0', gateway: '172.16.0.254', interface: 'eth2' },
  { uuid: '4', address: '192.168.10.1', mask: '255.255.255.0', gateway: '192.168.10.254', interface: 'eth0' },
  { uuid: '5', address: '10.10.10.1', mask: '255.255.0.0', gateway: '10.10.10.254', interface: 'eth1' },
  { uuid: '6', address: '172.20.0.1', mask: '255.255.0.0', gateway: '172.20.0.254', interface: 'eth3' },
  { uuid: '7', address: '192.168.2.1', mask: '255.255.255.0', gateway: '192.168.2.254', interface: 'wlan0' },
  { uuid: '8', address: '10.1.1.1', mask: '255.255.255.0', gateway: '10.1.1.254', interface: 'eth0' },
  { uuid: '9', address: '172.30.0.1', mask: '255.255.0.0', gateway: '172.30.0.254', interface: 'eth2' },
];

const ipToNumber = (ip: string) =>
  ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);

function App() {

  const [sortConfig, setSortConfig] = useState<{ key: keyof Route, direction: 'asc' | 'desc' } | null>(null);

  const sortedRoutes = [...initialRoutes].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let compareA: string | number = a[key];
    let compareB: string | number = b[key];

    if (key === 'address' || key === 'gateway') {
      compareA = ipToNumber(compareA as string);
      compareB = ipToNumber(compareB as string);
    }

    if (compareA < compareB) return direction === 'asc' ? -1 : 1;
    if (compareA > compareB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof Route) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div className="App">
      <h1>NDM тестовое ( React + TS )</h1>
      <h2>Список маршрутов</h2>
      <table border={1} cellPadding={6}>
        <thead>
        <tr>
          <th onClick={() => handleSort('address')}>Адрес назначения</th>
          <th onClick={() => handleSort('gateway')}>Шлюз</th>
          <th onClick={() => handleSort('interface')}>Интерфейс</th>
        </tr>
        </thead>
        <tbody>
        {sortedRoutes.map((route) => (
          <tr key={route.uuid}>
            <td>{route.address}</td>
            <td>{route.gateway}</td>
            <td>{route.interface}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
