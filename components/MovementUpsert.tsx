import { Categories } from "../consts/Categories.ts";
import Deleter from "../islands/Deleter.tsx";
import { Movement } from "../types/Movement.type.ts";

interface Props {
  movement?: Movement;
}

export default (props: Props) => {
  const movement = props.movement;
  const [month, day, year] = new Date().toLocaleDateString().split("/");
  const dateString = `${year.padStart(2, "0")}-${
    month.padStart(
      2,
      "0",
    )
  }-${day.padStart(2, "0")}`;

  const formAttrs = {
    method: "post",
    action: "/api/movement",
    onClick: (e: Event) => e.preventDefault(),
  };

  return (
    <article class="grid relative">
      <div>
        <div class="flex justify-between mb-4">
          <hgroup>
            <h4>{movement ? "✎ Edit" : "💸 New"}</h4>
            <h6>You can {movement ? "edit" : "input"} movement info here</h6>
          </hgroup>
        </div>
        <form {...formAttrs}>
          <input type="hidden" name="_method" value="POST" />
          <input type="hidden" name="id" value={movement?.id} />
          <input
            type="text"
            value={movement?.note}
            placeholder="Note"
            name="note"
            aria-label="Note"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            aria-label="amount"
            value={movement?.amount.toString()}
            step="0.25"
            required
          />
          <input
            type="date"
            id="date"
            name="date"
            value={dateString}
            required
          />
          <select class="capitalize" name="category" required>
            <option value="" disabled selected>
              Categoria
            </option>
            {Categories.map((category) => (
              <option
                selected={category === movement?.category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          <button type="submit">{movement ? "Save" : "Add"}</button>
        </form>
        {movement && <Deleter />}
      </div>
    </article>
  );
};
