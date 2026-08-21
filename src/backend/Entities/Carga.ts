class Carga implements ICarga {
      id = '';
      status = enumStatusCarga.EMPTY;
      listaProduto = [] as IProdutoQuimico[];
      histórico = {} as IHistoricoCarga;
      listaDocumentosCarga = [] as IDocumentoCarga[];
      responsavelTecnico = {} as IUsuario;

      Carga(_id: string, _status: enumStatusCarga, _listaProduto: IProdutoQuimico[], _histórico: IHistoricoCarga, _listaDocumentosCarga: IDocumentoCarga[], _responsavelTecnico: IUsuario) {
            this.id = _id;
            this.status = _status;
            this.listaProduto = _listaProduto;
            this.histórico = _histórico;
            this.listaDocumentosCarga = _listaDocumentosCarga;
            this.responsavelTecnico = _responsavelTecnico;
      }
}