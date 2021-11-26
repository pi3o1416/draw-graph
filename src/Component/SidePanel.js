
import React from 'react'



export function SidePanel() {
    return (
        <div className="tile is-3">
            <div className="tile is-child">
                <div className="panel" >
                    <p className="panel-heading">
                        Filter by
                    </p>
                    <p className="panel-block is-active">
                        <span className="panel-icon">
                            <i className="fas fa-book" aria-hidden="true"></i>
                        </span>
                        Date
                    </p>
                </div>
            </div>
        </div>

    )
}
