import PropTypes from "prop-types";
import styles from "../styles/DataListItem.module.css"; // Importa el CSS específico para el componente UserList

const DataListItem = ({ data = [], renderHeaders, renderRow, emptyMessage = "No data available" }) => {
  return (
    <div className={styles.leaderboard}>
      <table className={styles.table}>
        <thead>
          <tr>
            {renderHeaders()} {/* Renderiza los encabezados personalizados */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr className={styles.tableRow} key={index}>
                {renderRow(item, index)} {/* Renderiza las filas personalizadas */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="100%" className={styles.emptyMessage}>
                {emptyMessage} {/* Mensaje configurable para datos vacíos */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

DataListItem.propTypes = {
  data: PropTypes.array.isRequired, // Lista de datos
  renderHeaders: PropTypes.func.isRequired, // Función para renderizar los encabezados
  renderRow: PropTypes.func.isRequired, // Función para renderizar cada fila
  emptyMessage: PropTypes.string, // Mensaje para cuando no hay datos
};

export default DataListItem;