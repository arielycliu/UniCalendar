import './Colors.css'
export default function Colors({ colors }) {
    return (
        <>
            <div className="color-map">
				<h2>Course Code Colors</h2>
				<table className="color-table">
					<thead>
						<tr>
							<th>Course Code</th>
							<th>Color</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(colors).map(([colors, color]) => (
							<tr key={colors}>
								<td>{colors}</td>
								<td style={{ backgroundColor: color }}>{color}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
        </>
    )
}