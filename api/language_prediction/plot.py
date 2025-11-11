import numpy as np
import matplotlib.pyplot as plt, matplotlib
matplotlib.use("Agg")
import numpy as np, base64
from io import BytesIO


def get_plot_base64(x: tuple, y: tuple):
    # sort by probability in descending order  
    x, y = np.array(x), np.array(y) * 100
    i = np.argsort(y)[::-1]
    x, y = x[i], y[i]

    buf = BytesIO()
    
    # transparente Figur
    fig, ax = plt.subplots(facecolor="none")
    plt.subplots_adjust(bottom=0.3) 

    color_title = "white"
    color_ticks = "white"
    bar_color = "#004de5"

    for position, spine in plt.gca().spines.items(): 
        if position in ("top", "right"): 
            spine.set_visible(False)
        else:
            spine.set_color("white")

    # ticks und lables white
    ax.tick_params(colors=color_ticks, which='both')
    ax.xaxis.label.set_color(color_ticks)
    ax.yaxis.label.set_color(color_ticks)
    ax.title.set_color(color_title)

    ax.bar(x, y, color=bar_color)
    ax.set_xlabel("Sprachen")
    ax.set_ylabel("Wahrscheinlichkeit (in %)")
    ax.set_xticks(range(len(x)))
    ax.set_xticklabels(x, rotation=90)

    plt.savefig(buf, format="png", transparent=True, dpi=300)
    plt.close(fig)
    buf.seek(0)

    img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return img_base64

languages = (
    "Arabisch",
    "Chinesisch",
    "Tschechisch",
    "Niederländisch",
    "Englisch",
    "Finnisch",
    "Französisch",
    "Deutsch",
    "Griechisch",
    "Ungarisch",
    "Italienisch",
    "Norwegisch",
    "Polnisch",
    "Portugiesisch",
    "Rumänisch",
    "Russisch",
    "Spanisch",
    "Schwedisch",
    "Türkisch"
)
