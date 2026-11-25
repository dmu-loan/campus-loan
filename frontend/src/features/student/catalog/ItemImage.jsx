import { icons } from "./items";
export function ItemImage({ item }) {
  return item.photo ? (
    <img
      className="catalog-photo"
      alt=""
      src={
        "/api/items/" + item.id + "/photo?v=" + encodeURIComponent(item.photo)
      }
    />
  ) : icons[item.id - 1] ? (
    <img src={"/img/" + icons[item.id - 1] + ".svg"} alt="" />
  ) : (
    <span className="item-initial" aria-hidden="true">
      {item.title.slice(0, 1)}
    </span>
  );
}
