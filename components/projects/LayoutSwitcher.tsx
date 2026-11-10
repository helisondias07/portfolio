import Link from "next/link";
import { LAYOUT_SWITCH, type ProjectLayoutId } from "./layout-types";
import Tx from "../Tx";

export default function LayoutSwitcher({ active }: { active: ProjectLayoutId }) {
  return (
    <nav className="lo-switch" aria-label="Layout options">
      <p className="lo-switch-k">
        <Tx pt="Opções de layout (prévia)" en="Layout options (preview)" />
      </p>
      <ul>
        {LAYOUT_SWITCH.map((item) => (
          <li key={item.id}>
            <Link href={item.href} aria-current={item.id === active ? "page" : undefined}>
              <Tx pt={item.pt} en={item.en} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
