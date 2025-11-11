import torch
from unidecode import unidecode
import re
import numpy as np
import string
from .Net import Net
import os

class Agent:
    def __init__(self):
        self.languages = (
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
        self.vocab = " "+string.ascii_lowercase

        self.model = Net(27, 64, 128, len(self.languages), 2)
        if not os.path.exists(model_path := "language_prediction/model.pth"):
            raise FileNotFoundError(f"File does not exist | {model_path}")
        self.model.load(model_path)
        self.model.eval()

    def __call__(self, text:str):
        x = self.__normalize_text(text)
        x = torch.from_numpy(self.__encode_text(x, min(len(x),100)))
        out = self.model.predict(x)
        return out


    def __normalize_text(self,text:str)->str:
        text = unidecode(text)
        # Schritt 1: Ersetze . , ? ! durch Leerzeichen
        text = re.sub(r'[.,?!]', '', text)
        # Schritt 2: Entferne alle Zeichen außer ASCII-Buchstaben und Leerzeichen
        text = re.sub(r'[^a-zA-Z ]', '', text)
        text = " ".join(word.strip() for word in text.split())
        text = text.lower()
        return text


    def __encode_text(self, text:str, length: int, vocab:str = " "+string.ascii_lowercase, dtype:type = np.int32)->np.ndarray:
        text = text[:length]
        array = np.zeros(length, dtype=dtype)
        for i,char in enumerate(text):
            array[i] = vocab.find(char)
        return array
