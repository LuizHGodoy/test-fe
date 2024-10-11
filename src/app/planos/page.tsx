"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Plan } from "@/components/columns";
import {
  CreatePlanForm,
  IPlanFormularioData,
} from "@/components/create-plans-form";
import { PlansTable } from "@/components/planos-table";
import { toast } from "@/components/ui/use-toast";
import {
  CreatePlansPayload,
  createPlan,
  getAllPlans,
} from "@/services/api/plans";

const defaultPlansData: IPlanFormularioData = {
  nome: "",
  descricao: "",
  precoBase: 0,
};

export default function PlansForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [planData, setPlanData] =
    useState<IPlanFormularioData>(defaultPlansData);
  const [data, setData] = useState<Plan[]>([]);

  const handleChange = (name: string, value: string | number) => {
    setPlanData(() => ({
      ...planData,
      [name]:
        typeof value === "string" && name === "precoBase"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    const payload: CreatePlansPayload = {
      nome: planData.nome,
      descricao: planData.descricao,
      precoBase: planData.precoBase,
    };

    await createPlan(payload).then((data) => {
      console.log(data);
      toast({ title: "Plano cadastrado com sucesso" });
    });

    setIsCreating(false);
  };

  const fetchPlans = async () => {
    const data = await getAllPlans();
    setData(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Adicionar Plano</h2>
        <Button type="submit" size="sm" onClick={() => setIsCreating(true)}>
          Adicionar Plano
        </Button>
      </div>

      <div className="border-b border-gray-200 w-full">
        {isCreating && (
          <CreatePlanForm
            planData={planData}
            handleChange={(name: string, value: string | number) =>
              handleChange(name, value.toString())
            }
            handleSubmit={handleSubmit}
            setPlanData={setPlanData}
            onCancel={() => {
              setIsCreating(false);
              setPlanData(defaultPlansData);
            }}
          />
        )}
      </div>
      {!isCreating && <PlansTable data={data} fetchPlans={fetchPlans} />}
    </div>
  );
}
